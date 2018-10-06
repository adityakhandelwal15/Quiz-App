package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"  
      "github.com/gorilla/sessions"         
      "github.com/gorilla/securecookie"         
)

var db *gorm.DB                                   
var err error
var store = sessions.NewCookieStore(securecookie.GenerateRandomKey(64),securecookie.GenerateRandomKey(32))

      

type Question struct {
   ID uint `json:"id"`
   Ques string `json:"ques"`
   Option1 string `json:"option1"`
   Option2 string `json:"option2"`
   Option3 string `json:"option3"`
   Option4 string `json:"option4"`
   Ans int`json:"ans"`
}

type Question2 struct {
   ID uint `json:"id"`
   Ques string `json:"ques"`
   Option1 string `json:"option1"`
   Option2 string `json:"option2"`
   Option3 string `json:"option3"`
   Option4 string `json:"option4"`
   Ans int`json:"ans"`
}
type Universal struct {
   ID uint `json:"id"`
   Genre string `json:"genre"`
   QuizName string `json:"quizname"` 
   Ques string `json:"ques"`
   Option1 string `json:"option1"`
   Option2 string `json:"option2"`
   Option3 string `json:"option3"`
   Option4 string `json:"option4"`
   Url string `json:"url"`
   Ans int`json:"ans"`
}

type Person struct {
   ID uint `json:"id"`
   FirstName string `json:"firstname"`
   LastName string `json:"lastname"`
   Email string `json:"email", gorm:"not null;unique"`
   Password string`json:"password"`
}
type Quiz struct {
   ID uint `json:"id"`
   QuizName string `json:"quizname", gorm:"not null;unique"`
   Genre string `json:"genre"`
}

type Scoreboard struct {
   ID uint `json:"id"`
   User string `json:"user", gorm:"not null;unique"`
   Score int`json:"score"`
   Genre string `json:genre`
}
type Scoreboard2 struct {
   ID uint `json:"id"`
   User string `json:"user",gorm:"not null;unique"`
   Score int`json:"score"`
   Genre string `json:genre`
}
type Universalscore struct {
   ID uint `json:"id"`
   User string `json:"user"` 
   Score int`json:"score"`
   Quizname string `json:"quizname"`
}

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()

   db.AutoMigrate(&Person{})
   db.AutoMigrate(&Universalscore{})
   db.AutoMigrate(&Quiz{})
   db.AutoMigrate(&Universal{})
   db.AutoMigrate(&Question{})
   db.AutoMigrate(&Question2{})
   db.AutoMigrate(&Scoreboard{})
   db.AutoMigrate(&Scoreboard2{})
   r := gin.Default()

   r.POST("/que", CreateQue)
   r.POST("/addque", AddQue)
   r.POST("/score", UniversalScore)
   r.POST("/universalscore", UniversalScore)
   r.POST("/score2", UniversalScore)
   r.POST("/que2", CreateQue2)
   r.GET("/getQuestions",GetQues )
   r.GET("/getleaderboard/:name",GetLeader )
   r.GET("/getoverallleader",GetOverallLeader )
   r.GET("/getQues/:name",GetDynamic )
   r.GET("/getQuestions2",GetQues2 )
   r.GET("/single/:id",SingleQue )
   r.GET("/getuser",getUser )
   r.GET("/getallque",GetAllQue )
   r.GET("/people/", GetPeople)                             // Creating routes for each functionality
   r.GET("/previousquiz/:name", GetPreviousQuiz)                             // Creating routes for each functionality
   r.GET("/getquiz", GetQuiz)                             // Creating routes for each functionality
   r.GET("/people/:id", GetPerson)
   r.POST("/people", CreatePerson)
   r.POST("/quiz", AddQuiz)
   r.PUT("/people/:id", UpdatePerson)
   r.PUT("/updateque/:id", UpdateQue)
   r.DELETE("/people/:id", DeletePerson)
   r.DELETE("/deleteque/:id", DeleteQue)
   r.DELETE("/deletequiz/:id", DeleteQuiz)
   r.POST("/login", login)
   r.Use((cors.Default()))
   r.Run(":8080")    
}

func getUser(c *gin.Context){
      session, _ := store.Get(c.Request, "session-name")
      username := session.Values["user"].(string)
      c.JSON(200,username)
}

func login(c *gin.Context) {
	var person Person
	c.BindJSON(&person)
	fmt.Println(person)
	if err :=db.Find(&person, "email = ? AND password = ?", person.Email, person.Password ).Error; err != nil {
      c.JSON(201,person)
	  fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "http://localhost:3000")
      c.Header("access-control-allow-credentials", "true") 

      session, _ := store.Get(c.Request, "react-go")
      session.Values["user"] = person.Email
      fmt.Println("hey")
      fmt.Println(session.Values["user"])
      session.Save(c.Request, c.Writer)
	c.JSON(200, person)
	fmt.Println("Success")
   }

}

func CreateQue(c *gin.Context) {
   var que Question
   c.BindJSON(&que)
   fmt.Println(que)
   db.Save(&que)
   c.Header("access-control-allow-origin", "http://localhost:3000") 
   c.JSON(200, que)
}
func AddQue(c *gin.Context) {
   var que Universal
   c.BindJSON(&que)
   fmt.Println(que)
   db.Save(&que)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, que)
}

func AddQuiz(c *gin.Context) {
   var que Quiz
   c.BindJSON(&que)
   fmt.Println(que)
   db.Save(&que)
   c.Header("access-control-allow-origin", "http://localhost:3000") 
   c.JSON(200, que)
}

func score(c *gin.Context) {
   var sc Scoreboard
   c.BindJSON(&sc)
   fmt.Println(sc)
   db.Save(&sc)
   c.Header("access-control-allow-origin", "http://localhost:3000") 
   c.JSON(200, sc)
}
func UniversalScore(c *gin.Context) {
   var sc Universalscore
   c.Header("access-control-allow-origin", "*") 
   fmt.Println("aivhya gvat")
   c.BindJSON(&sc)
   fmt.Println(sc)
   if err := db.Save(&sc).Error; err != nil{
      c.AbortWithStatus(404)
      fmt.Println("ahdjdhjd")
   }else{
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, sc)
   }
}
func score2(c *gin.Context) {
   var sc Scoreboard2
   c.BindJSON(&sc)
   fmt.Println(sc)
   db.Save(&sc)
   c.Header("access-control-allow-origin", "http://localhost:3000") 
   c.JSON(200, sc)
}

func CreateQue2(c *gin.Context) {
   var que2 Question2
   c.BindJSON(&que2)
   fmt.Println(que2)
   db.Save(&que2)
   c.Header("access-control-allow-origin", "http://localhost:3000") 
   c.JSON(200, que2)
}

func GetQues(c *gin.Context) {
   var que []Question
   if err := db.Find(&que).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, que)
   }
}
func GetLeader(c *gin.Context) {
   var ty []Universalscore
   n := c.Params.ByName("name")
   
   fmt.Println(n)
   if err := db.Order("score desc").Find(&ty, "quizname = ?", n).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, ty)
   }
}
func GetOverallLeader(c *gin.Context) {
   var ty []Universalscore
   n := c.Params.ByName("name")
   
   fmt.Println(n)
   if err := db.Order("score desc").Find(&ty).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, ty)
   }
}
func GetDynamic(c *gin.Context) {
   var d []Universal
   name := c.Params.ByName("name")
   if err := db.Find(&d, "quiz_name = ?", name).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, d)
   }
}
func GetPreviousQuiz(c *gin.Context) {
   var d []Universalscore
   n := c.Params.ByName("name")
   fmt.Println(n)
   if err := db.Find(&d, "user = ?", n).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      fmt.Println(d)
      c.JSON(200, d)
   }
}

func GetQues2(c *gin.Context) {
   var que2 []Question2
   if err := db.Find(&que2).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, que2)
   }
}

func SingleQue(c *gin.Context) {
	//id := c.Params.ByName("id")
   var que []Question
   if err := db.Where("id = 1").First(&que).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*")
      c.JSON(200, que)
   }
}

func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func DeleteQue(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Universal
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func DeleteQuiz(c *gin.Context) {
   id := c.Params.ByName("id")
   var q Quiz
   fmt.Println(id)
   d := db.Where("id = ?", id).Delete(&q)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdatePerson(c *gin.Context) {
   var person Person
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&person)
   db.Save(&person)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, person)
}
func UpdateQue(c *gin.Context) {
   var person Universal
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&person)
   db.Save(&person)
   c.Header("access-control-allow-origin", "*") 
   c.JSON(200, person)
}


func CreatePerson(c *gin.Context) {
   var person Person
   c.Header("access-control-allow-origin", "*")
   c.BindJSON(&person)
   if err := db.Create(&person).Error;err !=nil{
       c.AbortWithStatus(404)
      fmt.Println(err)
   }else
   {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, person)
   }
}

func GetPerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, person)
   }
}

func GetPeople(c *gin.Context) {
   var people []Person
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, people)
   }
}

func GetAllQue(c *gin.Context) {
   var q []Universal
   fmt.Println("bavaa!")
   if err := db.Find(&q).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      fmt.Println(q)
      c.JSON(200, q)
   }
}

func GetQuiz(c *gin.Context) {
   var people []Quiz
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") 
      c.JSON(200, people)
   }
}
