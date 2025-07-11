"use client"
import ProfileCard from "../ui/profileCard"

const ProfileCardsSection = () =>{
    return (
    <section className = "relative flex flex-col items-center justify-center">
        <h2 className = "block text-center text-4xl font-semibold p-5"> El equipo fundador </h2>
        <p className = "max-w-2xl mb-10 md:text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure atque tenetur eius deleniti, asperiores delectus quibusdam reprehenderit perferendis molestiae ullam.</p>
        <div className = "flex flex-row gap-6">
          <ProfileCard
          name = "Othon Ansatuña"
          title = "Ingeniero Informático"
          handle = "Othon"
          status= "Online"
          contactText="Contacta conmigo"
          avatarUrl="/images/about/othon.jpg"
          showBehindGradient= {false}
          showUserInfo= {true}
          enableTilt= {true}
          onContactClick={()=> window.open("https://www.linkedin.com/in/othon-ansatu%C3%B1a-gomes-86297624b/", "_blank")}
          />
          <ProfileCard
            name = "Jhonatan "
            title = "Administrador logístico"
            handle = "Jhonatan"
            status= "Online"
            contactText="Contacta conmigo"
            avatarUrl="/images/about/Jhonny.jpg"
            showUserInfo= {true}
            enableTilt= {true}
            onContactClick={()=> window.open("https://www.linkedin.com/in/othon-ansatu%C3%B1a-gomes-86297624b/", "_blank")}
          />

        </div>
      </section>)
}

export default ProfileCardsSection;
    
