
import queryFocusable from './dom/query-focusable';
import queryTabbable from './dom/query-tabbable';
import isFocusable from './dom/is-focusable';
import isTabbable from './dom/is-tabbable';
import keycode from './map/keycode';

export default {
  query: {
    focusable: queryFocusable,
    tabbable: queryTabbable,
  },
  is: {
    focusable: isFocusable,
    tabbable: isTabbable,
  },
  map: {
    keycode: keycode,
  },
};
