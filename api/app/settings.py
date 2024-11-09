from pydantic_settings import BaseSettings, SettingsConfigDict






class Settings(BaseSettings):

    model_config = SettingsConfigDict(env_file=".env",)

    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_HOST: str
    POSTGRES_PORT: str

    ACCESS_TOKEN_LIFETIME_SECONDS: int
    RESET_PASSWORD_TOKEN_SECRET: str
    VERIFICATION_TOKEN_SECRET: str

    SUPERUSER_EMAIL:str
    SUPERUSER_PASSWORD: str
    SUPERUSER_IS_ACTIVE: bool
    SUPERUSER_IS_VERIFIED: bool
    SUPERUSER_ROLE: int

    @property
    def database_url_asyncpg(self):
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"



settings = Settings()



