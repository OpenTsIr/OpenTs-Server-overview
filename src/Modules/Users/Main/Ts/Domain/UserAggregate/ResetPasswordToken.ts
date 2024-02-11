import UUID from "src/Modules/Common/Main/Ts/Domain/SeedWorks/UUID";

export default class ResetPasswordToken extends UUID
{
    public static FIVE_MINUTES_IN_MILLISECONDS = 5 * 60 * 1000;
    public static RESET_PASSWORD_TOKEN_EXPIRES_AFTER = ResetPasswordToken.FIVE_MINUTES_IN_MILLISECONDS;
}