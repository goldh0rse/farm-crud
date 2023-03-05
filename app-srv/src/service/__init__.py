import motor.motor_asyncio

class DataBase:
    def __init__(self) -> None:
        self.client = motor.motor_asyncio.AsyncIOMotorClient(
            "mongodb://root:example@localhost:27017/?authMechanism=DEFAULT",
        )
        self.database = self.client.FarmDB
        self.users = self.database.users  # Creates a users table
        self.sessions = self.database.sessions
        self.products = self.database.products

db = DataBase()