export default class UserPersistenceModel
{
    public id: string;
    public email: string;
    public password: string;
    public nickname: string;
    public role: string;
    public resetPasswordToken: string;
    public resetPasswordTokenIssuedAt: Date;
    public emailVerificationToken: string;
    public emailVerificationTokenIssuedAt: Date;
    public status: string;
    public createdAt: Date;
    public updatedAt: Date;
    public concurrencyVersion: number;
}
