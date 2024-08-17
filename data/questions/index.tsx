import { childhoodQuestions } from './childhood';
import { traumaQuestions } from './trauma';
import { friendsQuestions } from './friends';
import { artQuestions } from './art';
import { musicQuestions } from './music';
import { filmsQuestions } from './films';
import { songsQuestions } from './songs';
import { religionQuestions } from './religion';
import { cultureQuestions } from './culture';
import { familyQuestions } from './family';
import { passionQuestions } from './passion';
import { aliveQuestions } from './alive';
import { travelQuestions } from './travel';
import { foodQuestions } from './food';
import { booksQuestions } from './books';
import { careerQuestions } from './career';
import { dreamsQuestions } from './dreams';
import { hobbiesQuestions } from './hobbies';
import { sportsQuestions } from './sports';
import { philosophyQuestions } from './philosophy';

export const allQuestions = {
  Childhood: childhoodQuestions,
  Trauma: traumaQuestions,
  Friends: friendsQuestions,
  Art: artQuestions,
  Music: musicQuestions,
  Films: filmsQuestions,
  Songs: songsQuestions,
  Religion: religionQuestions,
  Culture: cultureQuestions,
  Family: familyQuestions,
  Passion: passionQuestions,
  'Things that make you feel alive': aliveQuestions,
  Travel: travelQuestions,
  Food: foodQuestions,
  Books: booksQuestions,
  Career: careerQuestions,
  Dreams: dreamsQuestions,
  Hobbies: hobbiesQuestions,
  Sports: sportsQuestions,
  Philosophy: philosophyQuestions,
};

console.log('Loaded questions:', allQuestions);

export type QuestionTopic = keyof typeof allQuestions;