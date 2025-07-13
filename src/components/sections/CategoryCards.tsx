"use client"
import ProfileCard from "../ui/profileCard"

const CategoryCards = () =>{
    return (
        <div className = "flex flex-row gap-6 items-center justify-center p-5">
          <ProfileCard
          name = "Alimentación"
          title = ""
          handle = "Othon"
          status= "Online"
          contactText="Descúbrelos todos"
          avatarUrl="/images/categorias/alimentacion.jpg"
          showBehindGradient= {false}
          showUserInfo= {true}
          enableTilt= {true}
          onContactClick={()=> window.open("https://www.linkedin.com/in/othon-ansatu%C3%B1a-gomes-86297624b/", "_blank")}
          innerGradient="linear-gradient(to bottom, #0e344f, #0b2533, #081821)"

          />
          <ProfileCard
            name = "Limpieza "
            title = ""
            handle = "Jhonatan"
            status= "Online"
            contactText="Descúbrelos todos"
            avatarUrl="/images/categorias/limpieza.jpg"
            showUserInfo= {true}
            enableTilt= {true}
            onContactClick={()=> window.open("https://www.linkedin.com/in/othon-ansatu%C3%B1a-gomes-86297624b/", "_blank")}
            innerGradient="linear-gradient(to bottom, #0e344f, #0b2533, #081821)"

          />
          <ProfileCard
            name = "Cosmética"
            title = ""
            handle = "Pablo"
            status= "Online"
            contactText="Descúbrelos todos"
            avatarUrl="/images/categorias/cosmetica.jpg"
            showUserInfo= {true}
            enableTilt= {true}
            onContactClick={()=> window.open("https://www.linkedin.com/in/pablo-lopez-hernandez-/", "_blank")}
          innerGradient="linear-gradient(to bottom, #0e344f, #0b2533, #081821)"

/>

        </div>
      )
}

export default CategoryCards;
    
