import _ from 'lodash';
import {loop, Effects} from '@jarvisaoieong/redux-loop';
import {newGifCount} from './newGifCounterActions';
import {NEW_GIF} from 'modules/randomGif/randomGifActions';

export default (path) => (reducer) => (state, action) => {
  const {model, effect} = reducer(state, action);

  if (model !== state || !_.isEqual(effect, Effects.none())) {
    if (_.get(action, path) === NEW_GIF) {
      return loop(
        model
      ,
        Effects.batch([
          effect,
          Effects.constant(newGifCount()),
        ])
      );
    }
  }

  return loop(model, effect);
}
