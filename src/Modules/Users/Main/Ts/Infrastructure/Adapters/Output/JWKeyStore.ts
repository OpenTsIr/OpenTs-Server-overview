import * as crypto from "crypto";
import * as fs from "fs";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { IKeyStore } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IKeyStore";
import { JWK } from "node-jose";

export interface KeyPair
{
    privateKey: Awaited<ReturnType<typeof JWK.asKey>>;
    publicKey: Awaited<ReturnType<typeof JWK.asKey>>;
}

@Injectable()
export default class JWKeyStore implements IKeyStore
{
    private _keyStore = new Map<string, string>();

    private _numberOfDaysAKeypairShouldRemainInKeyStoreAfterRegenratingKeyPairInDays = 1;
    private _refreshTokenLifetimeInDays = 7;

    constructor ()
    {
        this.loadKeys();
    }
    public async getActiveKeyPair()
    {
        const [ kid, stringifiedKeys ] = Array.from(this._keyStore.entries())[ this.keysLength - 1 ];

        const { privateKey, publicKey } = JSON.parse(stringifiedKeys);


        const JWKs: KeyPair = { privateKey: await JWK.asKey(privateKey, "pem"), publicKey: await JWK.asKey(publicKey, "pem") };

        return [ kid, JWKs ] as [ string, KeyPair ];
    }
    public async getKeyPair(keyId: string): Promise<KeyPair>
    {
        const stringifiedKeys = this._keyStore.get(keyId);

        const { privateKey, publicKey } = JSON.parse(stringifiedKeys);

        return { privateKey: await JWK.asKey(privateKey, "pem"), publicKey: await JWK.asKey(publicKey, "pem") };
    }
    private get redundantKeysCount(): number
    {
        return this.keysLength - (this._refreshTokenLifetimeInDays + this._numberOfDaysAKeypairShouldRemainInKeyStoreAfterRegenratingKeyPairInDays);
    }
    public get keysLength(): number
    {
        return this._keyStore.size;
    }
    public async generate(): Promise<void>
    {
        const keysId = Date.now();

        try
        {
            const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa",
                {
                    modulusLength: 1024,
                    publicKeyEncoding: {
                        type: 'spki',
                        format: 'pem',
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                });
            this.writeKeys(keysId.toString(), JSON.stringify({ privateKey, publicKey }));
            this.loadKeys();
        }
        catch (error)
        {
            throw new InternalServerErrorException(error.message);
        }
    }
    private async loadKeys(): Promise<void>
    {
        try
        {
            this.revokeRedundantKeys();

            const keyFilenames = fs.readdirSync(process.cwd() + "/keys", "utf8");

            if (keyFilenames.length === 0)
            {
                await this.generate();
            }
            else for (const filename of keyFilenames)
            {
                const keyPair = fs.readFileSync(process.cwd() + `/keys/${ filename }`, "utf-8");

                const keyName = filename.split(".")[ 0 ];

                this._keyStore.set(keyName, keyPair);
            }
        }
        catch (error)
        {
            throw new InternalServerErrorException("Error while reading files from FS @JWKeyStore.loadKeys()");
        }
    }
    private deleteKey(keyId: string)
    {
        this._keyStore.delete(keyId);

        try
        {
            fs.unlinkSync(process.cwd() + "/keys/" + `${ keyId }`);
        }
        catch (error)
        {
            throw new InternalServerErrorException("Error while removing key from FS @JWKeyStore.deleteKey()");
        }
    }
    private areThereAnyRedundantKeys(): boolean
    {
        return (this.keysLength > (this._refreshTokenLifetimeInDays + this._numberOfDaysAKeypairShouldRemainInKeyStoreAfterRegenratingKeyPairInDays));
    }
    private deleteRedundantKeys()
    {
        for (let i = 0; i < this.redundantKeysCount; i++)
        {
            const keyToBeDeleted = Array.from(this._keyStore.entries())[ 0 ][ 0 ];

            this.deleteKey(keyToBeDeleted);
        }
    }
    private writeKeys(keysId: string, keyPair: string): void
    {
        try
        {
            fs.writeFileSync(process.cwd() + `/keys/${ keysId }.json`, keyPair);
        }
        catch (error)
        {
            throw new InternalServerErrorException("Error while writing files into FS @JWKeyStore.writeKeys()");
        }
    }
    private revokeRedundantKeys(): void
    {
        if (this.areThereAnyRedundantKeys())
        {
            this.deleteRedundantKeys();
        }
    }
}
