import { icon } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';

export const iconMap: Record<string, string> = {
  check: icon(faCheck).html[0],
  times: icon(faTimes).html[0],
  user: icon(faUser).html[0],
};