// Cook mode helpers: timers read out of a step's wording, and the ingredients a step mentions.
import type { EditorialRecipe } from '@/lib/types';
import { nameFor } from './catalogue';

export interface StepTimer {
  /** Seconds. A range ("20–25 minutes") takes the lower bound; the cook can always run it again. */
  secs: number;
  label: string;
}

const TIME = /(\d+(?:\.\d+)?)(?:\s*(?:–|-|to)\s*(\d+(?:\.\d+)?))?\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)\b/gi;

/** Every distinct timer a step mentions, in order ("simmer 20 minutes, then 5 more" → 20 min, 5 min). */
export function stepTimers(step: string): StepTimer[] {
  const out: StepTimer[] = [];
  for (const m of step.matchAll(TIME)) {
    const n = Number(m[1]);
    const unit = m[3].toLowerCase();
    const secs = Math.round(unit.startsWith('h') ? n * 3600 : unit.startsWith('m') ? n * 60 : n);
    if (secs < 10 || secs > 12 * 3600 || out.some((t) => t.secs === secs)) continue;
    out.push({ secs, label: timerLabel(secs) });
  }
  return out;
}

export function timerLabel(secs: number): string {
  if (secs < 60) return `${secs} sec`;
  if (secs < 3600) return `${Math.round(secs / 60)} min`;
  const h = Math.floor(secs / 3600), m = Math.round((secs % 3600) / 60);
  return m ? `${h} h ${m} min` : `${h} hour${h > 1 ? 's' : ''}`;
}

/** mm:ss or h:mm:ss for the countdown. */
export function clock(secs: number): string {
  const s = Math.max(0, Math.round(secs));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
  const mm = String(m).padStart(h ? 2 : 1, '0'), ss = String(r).padStart(2, '0');
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

const STOP = new Set(['and', 'the', 'of', 'with', 'in', 'or', 'a', 'to', 'for', 'fresh', 'large', 'small', 'medium', 'ground', 'chopped', 'diced', 'sliced', 'canned', 'dried', 'whole', 'boneless', 'skinless', 'leaves', 'oil']);

/** Ingredients whose name appears in the step, so the cook sees the amounts they need right now. */
export function stepIngredients(step: string, ing: [string, string][]): [string, string][] {
  const text = ` ${step.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ')} `;
  return ing.filter(([k]) => {
    const words = nameFor(k).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
    if (!words.length) return false;
    // the full name, or any of its words with a singular/plural tolerance ("salmon fillets" matches "the salmon")
    const full = words.join(' ');
    if (text.includes(` ${full} `)) return true;
    return words.some((w) => {
      const stem = w.replace(/(es|s)$/, '');
      return stem.length > 3 && new RegExp(`\\b${stem}(e?s)?\\b`).test(text);
    });
  });
}

/** Cook mode shows the recipe at the servings the cook chose. */
export const servingsOf = (r: EditorialRecipe, pick: Record<number, number>, household: number): number => pick[r.id] ?? household ?? r.serv;
