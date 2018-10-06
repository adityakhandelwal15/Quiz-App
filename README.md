In Go i have used the following Packages:
"fmt"
"github.com/gin-contrib/cors"                        
"github.com/gin-gonic/gin"
"github.com/jinzhu/gorm"
_ "github.com/jinzhu/gorm/dialects/sqlite"  
"github.com/gorilla/sessions"         
"github.com/gorilla/securecookie" 

Additional Features:
1)I have also implemented sign in using google.
2)Each user is given 2 lifelines and can be used to eliminate options.
3)Multimedia Questions with images and audio are also supported.
4)There are two special quizes with a mix of ques for gk and movies for which even admin cannot delete ques.