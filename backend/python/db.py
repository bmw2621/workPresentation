import sqlite3
from sqlite3 import Error

class DBConn:
    def __init__(self) -> None:
        conn = None
        try:
            conn = sqlite3.connect("../db.db")
        except Error as e:
            print(e)
        
        self.conn = conn
    

    def Close(self) -> None:
        self.conn.close()
        print("Connection to DB Closed")