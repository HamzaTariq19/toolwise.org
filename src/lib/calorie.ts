// Calorie results for the calorie calculator: rendered at build time (defaults) and in the browser.
import { fmt } from './ui';
export type CalIn = { sex: 'f' | 'm'; age: number; cm: number; kg: number; us: boolean; act: number };
export function calorieView(b: CalIn) {
  // Mifflin-St Jeor equation
  const bmr = 10 * b.kg + 6.25 * b.cm - 5 * b.age + (b.sex === 'm' ? 5 : -161);
  const tdee = bmr * b.act, floor = b.sex === 'm' ? 1500 : 1200;
  const per = b.us ? 'lb' : 'kg', step = b.us ? 1 : 0.5;
  const goals: [string, number][] = [[`Lose ${step} ${per} a week`, tdee - (b.us ? 500 : 550)], [`Lose ${step / 2} ${per} a week (mild)`, tdee - (b.us ? 250 : 275)], ['Maintain weight', tdee], [`Gain ${step / 2} ${per} a week`, tdee + (b.us ? 250 : 275)], [`Gain ${step} ${per} a week`, tdee + (b.us ? 500 : 550)]];
  return {
    main: fmt(Math.round(tdee)),
    sub: `Your body uses about ${fmt(Math.round(bmr))} kcal a day at complete rest (BMR).`,
    goals: goals.map(([l, v]) => `<tr><td class="py-2 text-muted">${l}</td><td class="py-2 text-right font-semibold">${fmt(Math.max(v, 0), 0)} kcal${v < floor ? ' <span class="text-danger">*</span>' : ''}</td></tr>`).join(''),
    note: goals.some(([, v]) => v < floor) ? `* Below ${fmt(floor)} kcal a day is not recommended without medical supervision.` : '',
  };
}
export const CAL_DEFAULT = calorieView({ sex: 'f', age: 35, cm: 168, kg: 68, us: false, act: 1.55 });
