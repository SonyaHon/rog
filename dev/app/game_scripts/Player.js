import {Controlled} from './Mixins';
import GameObject from './GameObject'

class Player extends GameObject {
    constructor(props) {
        super(props, [Controlled]);
    }
}

export default Player;