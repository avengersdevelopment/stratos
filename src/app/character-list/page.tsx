import Header from "@/components/header";
import Image from "next/image";
export default function Page() {
  const Char = [
    {
      firstName: "Elizabeth",
      lastName: "Astoria",
      title:"Socialite Informant of Stratos",
      desc: `Elizabeth Astoria is the quintessential socialite of Stratos, a master manipulator and information broker. With an uncanny ability to blend seamlessly into high society, Elizabeth moves through elite circles, gathering secrets and insights that others would kill to know. She thrives on connections, using her charm and intelligence to maneuver between power players, collecting valuable intelligence and providing it to those willing to pay her price. Always one step ahead, Elizabeth is both a confidante and a spy, using her network to fuel the ambitions of those she serves.`,
      img: "/assets/character-list/portrait-01.png",
    },
    {
      firstName: "Suzie",
      lastName: "Miles",
      title:"Head Detective of Stratos",
      desc: `Suzie Miles, the Head Detective of Stratos, is a sharp, no-nonsense investigator whose keen mind and relentless determination make her an invaluable asset to the city’s most pressing cases. Known for her ability to crack even the most complex of cases, Suzie is often the one called in when there’s no obvious answer. With a sharp eye for detail and a knack for reading people, Suzie can quickly discern motivations, intentions, and hidden truths—skills that make her the go-to detective for uncovering the truth in Stratos.`,
      img: "/assets/character-list/portrait-02.png",
    },
    {
      firstName: "Tor",
      lastName: "Zero",
      title:"Head Weapons Engineer of Stratos",
      desc: `Tor Zero, the head Weapons Engineer of Stratos, is a highly specialized individual designed to create, modify, and maintain the weapons systems that power Stratos’ defense mechanisms. As a synthetic entity, Tor operates with cold, calculated precision, constantly evolving and adapting to new threats. His mechanical nature allows him to work tirelessly, driven by logic and efficiency rather than emotion or fatigue. Tor’s mind is purely analytical, focused solely on creating the most effective and advanced weapons, ensuring the safety and security of Stratos.`,
      img: "/assets/character-list/portrait-03.png",
    },
    {
      firstName: "Gus",
      lastName: "Gallup",
      title:"Tank Pilot of Stratos",
      desc: `Gus Gallup is the formidable Tank Pilot of Stratos, known for his fearless and tough persona. As the heart of Stratos' armored defense unit, Gus embodies raw power and resilience. He pilots the most advanced tanks within the city, and his deep understanding of armored warfare makes him indispensable during combat situations. Despite his intimidating exterior, Gus has a strong sense of duty and loyalty, always putting his team and the city’s safety above all else. His behavior is stoic, methodical, and unyielding in battle, but with a certain rebellious streak that surfaces when he's off-duty. He is a man of few words but his presence is felt in every mission, every decision, and every battle fought.`,
      img: "/assets/character-list/portrait-04.png",
    },
    {
      firstName: "Klide",
      lastName: "Benson",
      title:"Ace Marksman of Stratos",
      desc: `Klide Benson is the sharpest of the sharp, an expert marksman who sees the world through the lens of precision and efficiency. With his quick reflexes and flawless aim, he embodies the silent perfection of a true sniper. Klide's lifestyle revolves around constant training, focus, and adaptability. He rarely speaks, but when he does, his words are laced with calculated intent, reflecting his sharp, no-nonsense demeanor. Klide is methodical and patient—his life on the edge of action, waiting for the perfect moment to strike.`,
      img: "/assets/character-list/portrait-05.png",
    },
    {
      firstName: "Igor",
      lastName: "Burr",
      title:"Mad Scientist of Stratos",
      desc: `Igor Burr, the Mad Scientist of Stratos, is a brilliant yet unpredictable mind, known for his unconventional methods and insatiable thirst for scientific exploration. Obsessed with pushing the boundaries of known science, he is not afraid to sacrifice ethics for knowledge. Igor thrives in the lab, where he spends countless hours tinkering with strange devices, dangerous experiments, and creating new technologies that may one day revolutionize Stratos. He is often seen with a maniacal grin, fueled by the excitement of his latest discoveries. His behavior is erratic, often jumping from one idea to the next without warning, but there’s a method to his madness.`,
      img: "/assets/character-list/portrait-06.png",
    },

  ];
  return (
    <>
      <Header />
      <section className="relative h-screen w-screen overflow-hidden bg-[url('/assets/homepage/bg.png')] bg-cover bg-no-repeat">
        <div className="h-screen w-screen px-[2vw] pt-[20vh]">
          <div className="flex h-full w-full flex-wrap gap-[2vw] overflow-x-hidden">
            {Char.map((char, index) => (
              <div key={index} className="relative h-[25vw] w-[30vw]">
                <Image
                  alt=""
                  height={500}
                  width={500}
                  src={char.img}
                  className="absolute top-0 z-0 w-[11vw] rounded-[1vw]"
                />
                <Image
                  alt=""
                  height={500}
                  width={500}
                  src={"/assets/character-list/id-frame.png"}
                  className="absolute z-10 size-full"
                />
                <div className="absolute left-[12vw] top-[1vw] z-10 flex w-[17vw] flex-col text-[2vw] font-bold text-[#F0DC9D]">
                  <div>{char.firstName}</div>
                  <div>{char.lastName}</div>
                  <div className="h-[0.2vw] w-full rounded-full bg-[#CD8C41]" />
                  <div className="text-[1.2vw] font-semibold" >{char.title}</div>
                </div>
                <div className="absolute text-justify left-0 top-[11vw] h-[13vw] overflow-y-auto z-10 flex w-full p-[1vw] flex-col text-[1vw] text-[#F0DC9D]">
                  <div>{char.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
