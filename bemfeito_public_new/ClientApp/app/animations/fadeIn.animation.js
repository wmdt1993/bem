import { trigger, state, animate, keyframes, transition, style } from '@angular/animations';
export const fadeInAnimation = trigger('fadeInAnimation', [
    state('*', style({
        opacity: 1,
        transform: 'translateX(0)'
    })),
    state('void', style({
        opacity: 0,
        transform: 'translateX(-20px)'
    })),
    transition('void => *', animate('100ms ease-out')),
    transition('* => void', animate('100ms ease-in')),
]);
export const fadeInAnimationOnLoad = trigger('fadeInAnimationOnLoad', [
    transition('void => *', [
        animate(800, keyframes([
            style({ opacity: 0, transform: 'translateX(-200px)', offset: 0.5 }),
            style({ opacity: 0.5, transform: 'translateX(-50px)', offset: .75 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
        ]))
    ])
]);
//# sourceMappingURL=fadeIn.animation.js.map