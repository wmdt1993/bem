import { trigger, animate, transition, style } from '@angular/animations';
export const fadeOutAnimation = trigger('fadeOutAnimation', [
    transition(':leave', [
        style({ opacity: 1 }),
        animate('.5s', style({ opacity: 0 }))
    ]),
]);
//# sourceMappingURL=fadeOut.animation.js.map