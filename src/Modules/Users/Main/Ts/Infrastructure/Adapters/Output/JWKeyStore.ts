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

    public constructor ()
    {
        this.loadKeys();
    }
    public async getActiveKeyPair(): Promise<[ string, KeyPair ]>
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
    // eslint-disable-next-line accessor-pairs
    private get _redundantKeysCount(): number
    {
        return this.keysLength - (this._refreshTokenLifetimeInDays + this._numberOfDaysAKeypairShouldRemainInKeyStoreAfterRegenratingKeyPairInDays);
    }
    // eslint-disable-next-line accessor-pairs
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
            this._writeKeys(keysId.toString(), JSON.stringify({ privateKey, publicKey }));
        }
        catch (error)
        {
            throw new InternalServerErrorException(error.message);
        }
    }
    public async loadKeys(): Promise<void>
    {
        try
        {
            const keyFilenames = fs.readdirSync(process.cwd() + "/keys", "utf8");

            for (const filename of keyFilenames)
            {
                const keyPair = fs.readFileSync(process.cwd() + `/keys/${ filename }`, "utf-8");

                const keyName = filename.split(".")[ 0 ];

                this._keyStore.set(keyName, keyPair);
            }
            this._revokeRedundantKeys();
        }
        catch (error)
        {
            console.log(error);
            throw new InternalServerErrorException("Error while reading files from FS @JWKeyStore.loadKeys()");
        }
    }
    private _deleteKey(keyId: string): void
    {
        try
        {
            fs.unlinkSync(process.cwd() + "/keys/" + `${ keyId }.json`);
            this._keyStore.delete(keyId);
        }
        catch (error)
        {
            throw new InternalServerErrorException("Error while removing key from FS @JWKeyStore.deleteKey()");
        }
    }
    private _areThereAnyRedundantKeys(): boolean
    {
        console.log(this.keysLength, (this._refreshTokenLifetimeInDays + this._numberOfDaysAKeypairShouldRemainInKeyStoreAfterRegenratingKeyPairInDays));
        return (this.keysLength > (this._refreshTokenLifetimeInDays + this._numberOfDaysAKeypairShouldRemainInKeyStoreAfterRegenratingKeyPairInDays));
    }
    private _deleteRedundantKeys(): void
    {
        for (let i = 0; i < this._redundantKeysCount; i++)
        {
            console.log(i);
            const keyToBeDeleted = Array.from(this._keyStore.keys())[ 0 ];
            console.log(keyToBeDeleted);

            this._deleteKey(keyToBeDeleted);
        }
    }
    private _writeKeys(keysId: string, keyPair: string): void
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
    private _revokeRedundantKeys(): void
    {
        if (this._areThereAnyRedundantKeys())
        {
            this._deleteRedundantKeys();
        }
    }
}
