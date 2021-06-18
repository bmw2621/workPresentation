package main

import (
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)



func initializeRouter() {
	r := mux.NewRouter()
	
	r.HandleFunc("/user", GetAllUsers).Methods("GET")
	r.HandleFunc("/user", CreateUser).Methods("POST")
	r.HandleFunc("/user/{id}", GetUserById).Methods("GET")

	log.Fatal(http.ListenAndServe(":5000", handlers.CORS()(r)))
}

func main() {	
	InitializeDb()
	initializeRouter()
}