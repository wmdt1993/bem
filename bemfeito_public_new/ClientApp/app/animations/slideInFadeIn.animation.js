import { trigger, state, animate, transition, style } from '@angular/animations';
export const slideInFadeInAnimation = trigger('slideInFadeInAnimation', [
    state('*', style({
        opacity: 1,
        transform: 'translateY(0)'
    })),
    state('void', style({
        opacity: 0,
        height: 0,
        transform: 'translateY(-100px)'
    })),
    transition('void => *', animate('500ms ease-out')),
    transition('* => void', animate('500ms ease-in')),
]);
//# sourceMappingURL=slideInFadeIn.animation.js.map