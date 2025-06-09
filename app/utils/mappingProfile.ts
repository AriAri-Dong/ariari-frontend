import ariari from "../images/profile/ariari.svg";
import chicken from "../images/profile/chicken.svg";
import cow from "../images/profile/cow.svg";
import mouse from "../images/profile/mouse.svg";
import pig from "../images/profile/pig.svg";
import rabbit from "../images/profile/rabbit.svg";
import tiger from "../images/profile/tiger.svg";
import horse from "../images/profile/horse.svg";
import sheep from "../images/profile/sheep.svg";
import dog from "../images/profile/dog.svg";
import dragon from "../images/profile/deer.svg";
import snake from "../images/profile/turtle.svg";

export const profileImageMap: Record<string, string> = {
  ARIARI_MOUSE: mouse,
  ARIARI_COW: cow,
  ARIARI_TIGER: tiger,
  ARIARI_RABBIT: rabbit,
  ARIARI_DRAGON: dragon,
  ARIARI_SNAKE: snake,
  ARIARI_HORSE: horse,
  ARIARI_SHEEP: sheep,
  ARIARI_CHICKEN: chicken,
  ARIARI_DOG: dog,
  ARIARI_PIG: pig,
  // ARIARI_MONKEY intentionally omitted
};

export const getProfileImage = (type?: string | null): string => {
  return profileImageMap[type ?? ""] || ariari;
};