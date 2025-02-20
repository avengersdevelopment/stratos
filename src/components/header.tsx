import Image from "next/image";
import Link from "next/link";
interface NavigationItem {
  title: string;
  link: string;
}

export const Header = () => {
  return (
    <header className='fixed left-1/2 top-0 z-50 h-[18vh] w-full -translate-x-1/2 bg-[url("/assets/header/header.png")] bg-contain bg-no-repeat'>
      <div className="fixed left-[0.5vw] top-[1vh] flex h-[5vh] w-[33vw] gap-[1vw]">
        <Link className="relative h-fit w-fit hover:animate-shake" href={"/"}>
          <Image
            src={"/assets/header/button-1.png"}
            width={500}
            height={500}
            alt="app logo"
            className="w-[18vw]"
          />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[2.5vw] font-bold text-[#CD8C41]">
            Home
          </span>
        </Link>
        <Link className="relative h-fit w-fit hover:animate-shake" href={"/"}>
          <Image
            src={"/assets/header/button-2.png"}
            width={500}
            height={500}
            alt="app logo"
            className="w-[20vw]"
          />
          <span className="absolute left-[4vw] top-[0.5vh] text-[2.5vw] font-black text-[#CD8C41]">
            Buy
          </span>
        </Link>
      </div>

      <div className="fixed right-[0.7vw] top-[1vh] flex h-[5vh] w-[33vw] gap-[1vw]">
        <Link className="relative h-fit w-fit hover:animate-shake" href={"/"}>
          <Image
            src={"/assets/header/button-2.png"}
            width={500}
            height={500}
            alt="app logo"
            className="w-[20vw] scale-x-[-1]"
          />
          <span className="absolute right-[4vw] top-[0.5vh] text-[2.5vw] font-black text-[#CD8C41]">
            Docs
          </span>
        </Link>
        <Link className="relative h-fit w-fit hover:animate-shake" href={"/"}>
          <Image
            src={"/assets/header/button-1.png"}
            width={500}
            height={500}
            alt="app logo"
            className="w-[18vw]"
          />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[2.5vw] font-bold text-[#CD8C41]">
            <svg className="w-[2.2vw]"
              width="300"
              height="301"
              viewBox="0 0 300 301"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_821_2)">
                <path
                  d="M178.57 127.15L290.27 0H263.81L166.78 110.38L89.34 0H0L117.13 166.93L0 300.25H26.46L128.86 183.66L210.66 300.25H300M36.01 19.54H76.66L263.79 281.67H223.13"
                  fill="#CD8C41"
                />
              </g>
              <defs>
                <clipPath id="clip0_821_2">
                  <rect width="300" height="300.251" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
