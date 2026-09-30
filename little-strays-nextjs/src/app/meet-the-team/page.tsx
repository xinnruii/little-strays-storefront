import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Team"
};

const teamMembers = [
  {
    name: "Joe",
    role: "Chief Operations Officer",
    image: "/images/meettheteam_page_joe.jpg",
    alt: "Joe from the Little Strays team",
    bio: "The oldest brother and the one keeping this company running. Joe likes routines, quiet corners, and knowing everyone's exactly where they should be. If things feel calm and comfortable around here, Joe is probably on duty."
  },
  {
    name: "Pika",
    role: "Chief Standards Officer",
    image: "/images/meettheteam_page_pika.jpg",
    alt: "Pika from the Little Strays team",
    bio: "The only dog on the team and, somehow, the toughest reviewer. Pika takes his time with everything and approves very little. New ideas, new products, even new beds all go through the Pika review process. His standards are high, and he intends to keep them that way."
  },
  {
    name: "Lucky",
    role: "Chief Nap Officer",
    image: "/images/meettheteam_page_lucky.jpg",
    alt: "Lucky from the Little Strays team",
    bio: "Head of rest, relaxation, and all things cozy. Lucky firmly believes that a good nap can solve almost anything. His expertise lies in finding the softest spots, testing comfort levels, and reminding the team that slowing down is also productive."
  },
  {
    name: "Mimi",
    role: "Chief Community Officer",
    image: "/images/meettheteam_page_mimi.jpg",
    alt: "Mimi from the Little Strays team",
    bio: "The first to say hello and the last to leave anyone out. Mimi has never met a stranger and considers making friends part of her job description. She keeps the team connected and reminds us that the best spaces are the ones where everyone feels welcome."
  }
];

export default function MeetTheTeamPage() {
  return (
    <section className="mx-auto max-w-[1720px] px-4 py-10 sm:px-6 lg:px-6 lg:py-20 xl:px-8">
      <div className="mx-auto mb-8 max-w-3xl sm:mb-10 lg:mb-12">
        <h1 className="text-center text-3xl font-semibold sm:text-4xl">Meet the Team</h1>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {teamMembers.map((member) => (
          <article
            key={member.name}
            className="grid overflow-hidden rounded-sm bg-paper shadow-soft"
          >
            <div className="grid aspect-square place-items-center bg-oat p-6 sm:p-8">
              <img
                src={member.image}
                alt={member.alt}
                className="aspect-square h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="grid gap-3 p-4 sm:p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                  {member.role}
                </p>
                <h2 className="mt-2 text-xl font-semibold leading-tight sm:text-2xl sm:leading-none">
                  {member.name}
                </h2>
              </div>
              <p className="text-sm leading-6 text-muted">{member.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
