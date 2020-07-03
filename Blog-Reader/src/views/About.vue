<template>
  <div class="about">
    <h1 class="title">About Me</h1>
    <div class="career">
      <h3>WHO AM I?</h3>
      <p>
        I'm Daniel De La O, a student at UTRGV working towards a Bachelor's
        degree in Computer Engineering, concentrating on Software. I'm currently
        learning about web development, and my goal is to become a full stack
        developer. I have created this site to display my projects as well as a
        blog about my life, movies, and video games.
      </p>
    </div>
    <div class="skills">
      <h3>MY SKILLS</h3>
      <p>
        I'm most knowledgeable about the front-end of an application because
        HTML5, CSS3, and JavaScript are the first technologies I begun to learn
        on my path to become a web developer. I'm currently becoming acquainted
        with the back-end of an application, specifically learning the Node.js
        environment using the Express framework and MongoDB database. This site
        is built using Vue.js, Express, and MongoDB.
      </p>
    </div>
    <div class="hobbies">
      <h3>MY HOBBIES</h3>
      <p>
        I truly enjoy watching movies, be it at the theater or at home. My top
        five favorite movies have got to be: The Dark Knight, The Grand Budapest
        Hotel, Inception, Star Wars: The Empire Strikes Back, and Spider-Man:
        Into the Spider-Verse. The best movie going experience I've had was
        watching Star Wars: The Force Awakens at the theater, the crowd went
        crazy when the title came on the screen and also whenever an old
        character appeared. I also like playing videogames, my favorite
        videogame is The Legend of Zelda: Breath of The Wild. I have played it
        multiple times and every time I experience something new. I have not
        completed it 100% because there are too many korok seeds to find.
      </p>
    </div>
    <div class="goals">
      <h3>MY GOALS</h3>
      <p>
        My current goal is to acquire a job in the web development industry. At
        first I wanted to find a company near my hometown, but now I'm opening
        up to the idea of going anywhere and start fresh.
      </p>
    </div>
  </div>
</template>

<style scoped>
h1,
h3,
p {
  font-family: Roboto, sans-serif;
}

h3 {
  padding: 20px 0;
  color: #0088a9;
}

.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
}

.about div {
  width: 50%;
}
</style>
