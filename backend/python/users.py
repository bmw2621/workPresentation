from flask import jsonify, request
from flask_restful import abort, Resource
from db import DBConn

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


class UserController(Resource):
    def get(self, id):
        conn = DBConn()
        conn.conn.row_factory = dict_factory
        cur = conn.conn.cursor()
        query = "SELECT * FROM Users WHERE id=?"
        cur.execute(query, (id))
        data = cur.fetchall()

        if len(data) > 0 :
            return data[0]
        else:
            abort(404, message=f"User {id} doesn't exist")

    


class UsersController(Resource):
    def get(self):
        conn = DBConn()
        conn.conn.row_factory = dict_factory
        cur = conn.conn.cursor()
        query = "SELECT * FROM Users"
        cur.execute(query)
        print(cur)
        data = cur.fetchall()
        conn.Close()
        return data

    def post(self):
        req = request.get_json(force=True)

        requried_fields = {'firstName', 'lastName', 'age', 'isBamaFan'}
        missing_fields = requried_fields.difference(req)
        if len(missing_fields) != 0:
            abort(400,message=f"Request body missing values: {missing_fields}")

        conn = DBConn()
        cur = conn.conn.cursor()
        query = "INSERT INTO Users (firstName, lastName, age, isBamaFan) VALUES (?,?,?,?)"
        params = (req["firstName"], req["lastName"], req["age"], req["isBamaFan"])
        cur.execute(query, params)
        data = req
        data["id"] = cur.lastrowid
        conn.conn.commit()
        conn.Close()
        return data