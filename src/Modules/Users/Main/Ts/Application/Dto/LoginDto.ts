export class LoginDto
{
    public constructor
        (
            public email: string,
            public nickname: string,
            public id: string,
            public accessToken: string,
            public refreshToken: string
        )
    { }
}
