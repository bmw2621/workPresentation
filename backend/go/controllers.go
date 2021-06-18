package main

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
)

type User struct {
	Id 			int		`json:"id"`
	FirstName 	string	`json:"firstName"`
	LastName 	string	`json:"lastName"`
	Age 		int		`json:"age"`
	IsBamaFan 	bool	`json:"isBamaFan"`
}

type Users []User

var db *sql.DB;

func InitializeDb(){
	db, _ = sql.Open("sqlite3", "/home/ben/dev/workTut/backend/db.db")
}

func GetAllUsers(res http.ResponseWriter, r *http.Request) {
	var users Users;
	row, err := db.Query("SELECT id, firstName, lastName, age, isBamaFan FROM Users")
	handleErr(res, err)
	defer row.Close()


	for row.Next() {
		var id int
		var firstName string
		var lastName string
		var age	int
		var isBamaFan bool
		row.Scan(&id, &firstName, &lastName, &age, &isBamaFan)

		foundUser := User{
			Id: id,
			FirstName: firstName,
			LastName: lastName,
			Age: age,
			IsBamaFan: isBamaFan,
		}

		
		users = append(users, foundUser)
	}
	json.NewEncoder(res).Encode(users)

}

func GetUserById(res http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	userId := params["id"]

	row := db.QueryRow("SELECT id, firstName, lastName, age, isBamaFan FROM Users WHERE id=?", userId)

	var id int
	var firstName string
	var lastName string
	var age	int
	var isBamaFan bool
	row.Scan(&id, &firstName, &lastName, &age, &isBamaFan)

	if id != 0 {
		foundUser := User{
			Id: id,
			FirstName: firstName,
			LastName: lastName,
			Age: age,
			IsBamaFan: isBamaFan,
		}
		json.NewEncoder(res).Encode(foundUser)
	} else {
		res.WriteHeader(http.StatusNotFound)
		json.NewEncoder(res)
	}


}

func CreateUser(res http.ResponseWriter, r *http.Request) {
	var newUser User
	json.NewDecoder(r.Body).Decode(&newUser)

	stmt, _ := db.Prepare("INSERT INTO Users (firstName, lastName, age, isBamaFan) VALUES (?,?,?,?)")
	result, err := stmt.Exec(newUser.FirstName, newUser.LastName, newUser.Age, newUser.IsBamaFan)
	handleErr(res, err)

	lastId, err := result.LastInsertId()
	handleErr(res, err)
	
	res.WriteHeader(http.StatusCreated)
	json.NewEncoder(res).Encode(lastId)
}

func handleErr(res http.ResponseWriter, err error){
	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(res)
	}
}
