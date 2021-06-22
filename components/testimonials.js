import React from "react";
import Image from "next/image";
import Markdown from "react-markdown";
import Masonry from "react-masonry-css";

const Testimonials = () => {
  const [isOpen, setOpen] = React.useState(false);
  const breakpointColumns = {
    default: 4,
    1100: 3,
    780: 2,
    500: 1,
  };
  return (
    <section className="py-8 sm:py-16 bg-gray-50 -m-5 px-5 border-t border-gray-100">
      <h2 className="max-w-screen-md pb-16 mx-auto font-serif text-3xl font-extrabold text-center lg:text-4xl sm:text-4xl leading-tighter">
        What people are saying...
      </h2>
      <div
        className={`flex flex-col items-center max-w-screen-xl mx-auto w-full relative ${
          isOpen
            ? ""
            : "lg:max-h-[840px] sm:max-h-[760px] max-h-[700px] overflow-y-hidden"
        }`}
      >
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex w-auto"
          columnClassName="p-2 bg-clip-padding"
        >
          {tweets.map((t) => {
            const { text, name, handle, url, avatar } = t;
            return (
              <article key={handle}>
                <a
                  className="p-5 block bg-white shadow-xl mb-4 rounded-xl"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <header className="flex w-full justify-between items-start">
                    <div className="flex items-center">
                      <Image
                        src={avatar}
                        width={40}
                        height={40}
                        alt={name}
                        className="rounded-full"
                      />
                      <div className="pl-2 leading-tight">
                        <Markdown skipHtml={true} className="font-semibold">
                          {name}
                        </Markdown>
                        <div className="text-sm opacity-80">@{handle}</div>
                      </div>
                    </div>
                    <TwitterIcon />
                  </header>
                  <Markdown className="prose leading-normal pt-3">
                    {text
                      ?.replace("@dan_abramov", "Dan Abramov")
                      .replace("@Mappletons", "Maggie Appleton")
                      .replace("@mappletons", "Maggie Appleton")
                      .replace(
                        "https://justjavascript.com",
                        "JustJavaScript.com"
                      )
                      .replace("justjavascript.com", "JustJavaScript.com")}
                  </Markdown>
                </a>
              </article>
            );
          })}
        </Masonry>
        {!isOpen && (
          <div className="absolute pointer-events-none bottom-0 left-0 w-full h-56 bg-gradient-to-t from-gray-50 to-transparent" />
        )}
        <button
          className={`flex items-center rounded-lg bg-black shadow-xl text-white px-5 py-3 ${
            isOpen ? "absolute bottom-8" : "absolute bottom-8"
          }`}
          onClick={() => setOpen(!isOpen)}
        >
          {isOpen ? "Show Less" : "Show More"}
        </button>
      </div>
    </section>
  );
};

export default Testimonials;

const tweets = [
  {
    name: "Domagoj Vidovic",
    handle: "domagojvidovicc",
    text: `@dan_abramov made an amazing course about #javascript mental models. It's such a unique opportunity to dive into his mindset and learn what's happening in his brain while coding.\n\nI highly recommend it.`,
    avatar: "/avatars/domagoj-vidovic.jpg",
    url: "https://twitter.com/domagojvidovicc/status/1398315630210666500",
  },
  {
    name: "Eyel Mordido",
    handle: "eyel_mordido",
    avatar: "/avatars/eyel-mordido.jpg",
    text: `Highly recommend reading @dan_abramov's Just JavaScript modules coupled with solving edabit challenges everyday to build JS understanding.`,
    url: "https://twitter.com/eyel_mordido/status/1289405549293891587",
  },
  {
    name: "Juan Silupú Maza",
    handle: "juanSilupuTM",
    text: `I feel amazing!!! 🤩🤩🤩\nWhat a great way to escape into space and know what are those bright spots that are seen from my code. That is Javascript ♥ suscribe and just learn in justjavascript.com thanks @dan_abramov`,
    avatar: "/avatars/juan-silupu-maza.jpg",
    url: "https://twitter.com/juanSilupuTM/status/1234744345523294208",
  },
  {
    name: "Ismael Velasco",
    handle: "DevOnAJourney",
    avatar: "/avatars/ismael-velasco.jpg",
    text: `This is a fantastic new approach to learning JavaScript from the amazing @dan_abramov. Worth doing even if you have some experience in the language. I started it before life and Covid got in the way,  but really want to finish it.`,
    url: "https://twitter.com/DevOnAJourney/status/1358764580558749696",
  },
  {
    name: `Fab || Student <img alt="Woman with headscarf" draggable="false" src="https://abs-0.twimg.com/emoji/v2/svg/1f9d5.svg" title="Woman with headscarf" className="inline" /> <img alt="Personal computer" draggable="false" src="https://abs-0.twimg.com/emoji/v2/svg/1f4bb.svg" title="Personal computer" className="inline" />`,
    handle: "fabcodingzest",
    avatar: "/avatars/fab.jpg",
    text: `So I read Just Javascript drafts by @dan_abramov today and damn I learned so much which I wasnt aware of even. The Mental Model is just awesome and cleared so many things to me. Thanks for sharing the drafts, Dan. Helped me tons 🙌`,
    url: "https://twitter.com/fabcodingzest/status/1231198339238158336",
  },
  {
    name: "David Lopez",
    handle: "letsbelopez",
    avatar: "/avatars/david-lopez.jpg",
    text: `If you're looking for a great JS fundamentals course, justjavascript.com has a fun and approachable style and the complementary illustrations are awesome. #100daysofcode #javascript`,
    url: "https://twitter.com/letsbelopez/status/1288713972208660486",
  },
  {
    name: "Heather Hamilton",
    handle: "heatherdevsweb",
    avatar: "/avatars/heather-hamilton.jpg",
    text: `I also want to add in that @dan_abramov's Just JavaScript course is really great at (re)building fundamental JS concepts!`,
    url: "https://twitter.com/heatherdevsweb/status/1274740683463589889",
  },
  {
    name: "Szymon Adamiak",
    handle: "s_adamiak",
    avatar: "/avatars/szymon-adamiak.jpg",
    text: `Want to solidify JavaScript fundamentals? The @dan_abramov justjavascript.com is a great tool to clean your mental models. Especially the concept of wires is super useful.`,
    url: "https://twitter.com/s_adamiak/status/1333497526935121920",
  },
  {
    name: "Lisa Jamhoury",
    handle: "lisajamhoury",
    avatar: "/avatars/lisa-jamhoury.jpg",
    text: `I just discovered Just Javascript from @dan_abramov and @mappletons. After years of working in Javascript, it's like they're taking my blinders off, one sentence at a time 🪄`,
    url: "https://twitter.com/lisajamhoury/status/1291477234570600448",
  },
  {
    name: "Wesley L Handy",
    handle: "WesleyLHandy",
    avatar: "/avatars/wesley-l-handy.jpg",
    text: `What's great about @dan_abramov & @Mappletons Just JavaScript is the clarity of the mental model. It makes so much sense, especially understanding immutability and the best practices you find in major libraries and frameworks.`,
    url: "https://twitter.com/WesleyLHandy/status/1265819570872430592",
  },
  {
    name: "Julie Allix",
    handle: "AllixJulie1",
    avatar: "/avatars/julie-allix.jpg",
    text: `A few days ago I started the Just JavaScript modules of @dan_abramov (one of the creators of Redux) & @Mappletons, and it's great! I highly recommend it to any developer who would like to get a deeper understanding of JavaScript.`,
    url: "https://twitter.com/AllixJulie1/status/1263775407662419973",
  },
  {
    name: "Elisha Terada",
    handle: "elishaterada",
    avatar: "/avatars/elisha-terada.jpg",
    text: `I recommend JavaScript devs to subscribe to “Just JavaScript” by @dan_abramov even if you are an experienced one. It’s like reading “JavaScript the Good Parts” but easier to read along with nice gif animations and you get a drip each day`,
    url: "https://twitter.com/elishaterada/status/1261746423072079872",
  },
  {
    name: "duverj",
    handle: "duverj",
    avatar: "/avatars/duverj.jpg",
    text: `Just Javascript by @dan_abramov is amazing! Can't recommend enough`,
    url: "https://twitter.com/duverj/status/1232367114847211521",
  },
  {
    name: "Karan Sharma",
    handle: "karansh491",
    avatar: "/avatars/karan-sharma.jpg",
    text: `One of the best things I've ever found on internet by just free surfing.`,
    url: "https://twitter.com/karansh491/status/1270014873028554752",
  },
  {
    name: "Zach Waterfield",
    handle: "zlwaterfield",
    avatar: "/avatars/zach-waterfield.jpg",
    text: `Thank you to @dan_abramov and @Mappletons for creating justjavascript.com. I am only 6 days in and already it has fundamentally changed my understanding and the way I think about Javascript. I think these resources will be immensely helpful for so many developers.`,
    url: "https://twitter.com/zlwaterfield/status/1264703097819090944",
  },
  {
    name: `clau <img alt="Transgender flag" draggable="false" src="https://abs-0.twimg.com/emoji/v2/svg/1f3f3-fe0f-200d-26a7-fe0f.svg" title="Transgender flag" width="16px">`,
    handle: "clai_rjimenez",
    avatar: "/avatars/clau.jpg",
    text: `A morning reading from JustJavaScript.com while having breakfast is my new thing.\n\nI'd recommend you join if you haven't.\n\n@dan_abramov is an excellent writer and the materials are really something.`,
    url: "https://twitter.com/clau_rjimenez/status/1365243323661885450",
  },
  {
    name: "Alessandra Casale",
    handle: "CasAlessandra87",
    avatar: "/avatars/alessandra-casale.jpg",
    text: `I just finished the 8th lesson of justjavascript.com by @dan_abramov. I am new of JS and this course helped me to start in the correct way. Very interesting and super funny thanks to the animations. It is not like the usual boring courses...I am really enthusiastic!`,
    url: "https://twitter.com/CasAlessandra87/status/1265773833774075904",
  },
  {
    name: "Filipe Amaral",
    handle: "Itisfilipe",
    avatar: "/avatars/filipe-amaral.jpg",
    text: `So, after writing javascript for more than 5 years, I realized that i know nothing about the language 😅`,
    url: "https://twitter.com/Itisfilipe/status/1265972687878459392",
  },
  {
    name: "Dion Almaer",
    handle: "dalmaer",
    avatar: "/avatars/dion-almaer.jpg",
    text: `No matter your JavaScript experience, everyone should go through justjavascript.com. It’s *so* beautifully done.`,
    url: "https://twitter.com/dalmaer/status/1362636626942332928",
  },
  {
    name: "Ramón Guijarro",
    handle: "soyguijarro",
    avatar: "/avatars/ramon-guijarro.jpg",
    text: `Delightful is a word too easily tossed around, but perfectly describes this course by @dan_abramov and @Mappletons. The idea of teaching mental models is intriguing on its own, but they also do it in such an enjoyable, poetic way. Something truly special.`,
    url: "https://twitter.com/soyguijarro/status/1262828037856473094",
  },
  {
    name: "Daniel Dietrich",
    handle: "danieldietrich",
    avatar: "/avatars/daniel-dietrich.png",
    text: `I can recommend Just JavaScript by @dan_abramov and @Mappletons, a course suitable for beginners.\n\nI already know #JavaScript but I really enjoyed the course. Especially the concept of building a “mental model”.`,
    url: "https://twitter.com/danieldietrich/status/1289829383482433536",
  },
  {
    name: "Fabrizio Rinaldi",
    handle: "linuz90",
    avatar: "/avatars/fabrizio-rinaldi.jpg",
    text: `justjavascript.com by @dan_abramov is terrific. If you’re a beginner/intermediate developer, or maybe a designer learning to code, it’s a must-read.`,
    url: "https://twitter.com/linuz90/status/1217402395480727553",
  },
  {
    name: "James",
    handle: "JamesHDev",
    avatar: "/avatars/james-h-dev.jpg",
    text: `Want to get a more advanced take on JavaScript?\n\nI highly recommend to signing up to the one and only @dan_abramov Just JavaScript. \n\nI have been reading it from the beginning and it's just amazing!`,
    url: "https://twitter.com/JamesHDev/status/1229482810811015168",
  },
  {
    name: "Megan Sullivan",
    handle: "meganesulli",
    avatar: "/avatars/megan-sullivan.jpg",
    text: `I’m really loving the Just JavaScript course by @dan_abramov and @Mappletons! It’s been especially helpful in correcting my mental model for how JS is different from other languages (like C++, which was my first programming language). #CodeNewbie https://justjavascript.com`,
    url: "https://twitter.com/meganesulli/status/1250602059595829249",
  },
  {
    name: "Adrian Paredes",
    handle: "AdrianM_Paredes",
    avatar: "/avatars/adrian-paredes.jpg",
    text: `If you want to learn JavaScript and have a good time, subscribe to https://justjavascript.com by @dan_abramov. You will not regret it. Recommended for people who already know JavaScript too, or people who think they know.`,
    url: "https://twitter.com/AdrianM_Paredes/status/1223749033946206210",
  },
  {
    name: `Dean Iverson`,
    handle: "deaninverson",
    avatar: "/avatars/dean-iverson.jpg",
    text: `@dan_abramov is just killing it with his https://justjavascript.com course.  Oh how I wish I had this back when I was really struggling with JavaScript.\n\n(as opposed to just kind of struggling like I do now) 🙂`,
    url: "https://twitter.com/deanriverson/status/1221212779765329921",
  },
];

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 text-[#1da1f2]"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
    />
  </svg>
);

function getTweetMetadata() {
  const text = document.getElementsByClassName(
    "css-901oao r-1fmj7o5 r-1qd0xha r-1blvdjr r-16dba41 r-vrz42v r-bcqeeo r-bnwqim r-qvutc0"
  );
  const name = document.getElementsByClassName(
    "css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0"
  );
  const handle = document.getElementsByClassName(
    "css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0"
  );
  const url = window.location;
  const avatar = document.getElementsByClassName("css-9pa8cd");
  const res = {
    name: name[0].innerText,
    handle: handle[0].innerText,
    text: text[0].innerText,
    avatar: avatar[1].currentSrc,
    url: url.href,
  };
  copy(res);
}
