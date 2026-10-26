// Favourites, History and Import.
import { useApp } from '@/hooks/usePlateful';
import { ALL_RECIPES, R, isFav, plural, status, timeText } from '@/lib/editorial';
import { BackBtn, Pad, RecipeCard, SRow, Sec, Spacer, Title, Topbar } from '../Bits';
import { I } from '../Icons';

const present = <T,>(x: T | undefined): x is T => x !== undefined;

export function Favourites() {
  const { ctx } = useApp();
  const favs = ALL_RECIPES.filter((r) => isFav(r.id, ctx));
  return (
    <>
      <Topbar left={<><BackBtn /><Title title="Favourites" meta={`${favs.length} saved · they rank higher in recommendations`} /></>} />
      <Pad>
        {favs.length ? <div className="grid2">{favs.map((r) => <RecipeCard key={r.id} r={r} sq />)}</div> : <p className="dek" style={{ marginTop: 20 }}>Tap the bookmark on any recipe to save it here.</p>}
      </Pad>
      <Spacer />
    </>
  );
}

export function History() {
  const { user, act } = useApp();
  const hist = (user.history || []).map(R).filter(present);
  const cooked = (user.cooked || []).map(R).filter(present);
  return (
    <>
      <Topbar left={<><BackBtn /><Title title="History" meta={`${hist.length} recently viewed · ${cooked.length} cooked`} /></>} />
      <Pad>
        <Sec eyebrow="Cooked" thin>
          {cooked.length ? <div className="grid2">{cooked.map((r) => <RecipeCard key={r.id} r={r} sq />)}</div> : <p className="dek" style={{ marginTop: 12 }}>Nothing cooked yet. Tap “I cooked this” under a recipe’s steps.</p>}
        </Sec>
        <Sec eyebrow="Recently viewed" thin>
          {hist.length
            ? hist.map((r) => <SRow key={r.id} img={r.img} t={r.name} m={`${r.diff} · ${plural(r.ing.length, 'ingredient')} · ${timeText(r.time)}`} onClick={() => act.detail(r.id)} style={{ padding: '10px 0' }} />)
            : <p className="dek" style={{ marginTop: 12 }}>Recipes you open show up here.</p>}
        </Sec>
      </Pad>
      <Spacer />
    </>
  );
}

const SOURCES = ['TikTok', 'Instagram', 'YouTube', 'Web'];

/** Import is simulated until the parsing service ships: any link resolves to a sample recipe. */
export function Import() {
  const { s, ctx, act } = useApp();
  const r = s.importResult !== null ? R(s.importResult) : undefined;
  const st = r ? status(r, ctx) : null;
  const src = SOURCES.find((x) => s.importUrl.toLowerCase().includes(x.toLowerCase())) || (s.importUrl ? 'Web' : 'TikTok');
  return (
    <>
      <Topbar left={<><BackBtn /><Title title="Import a recipe" meta="Paste a TikTok, Instagram, YouTube or web link" /></>} />
      <Pad>
        <div className="search">
          <I.link />
          <input type="url" placeholder="https://www.tiktok.com/@…" value={s.importUrl} autoComplete="off" aria-label="Recipe link" autoFocus onChange={(e) => act.patch({ importUrl: e.target.value })} onKeyDown={(e) => { if (e.key === 'Enter') act.doImport(); }} />
        </div>
        <nav className="ttabs small" aria-label="Source">
          {SOURCES.map((p) => <span key={p} className={`ttab${p === src ? ' on' : ''}`}>{p}</span>)}
        </nav>
        <button className="btn primary" onClick={act.doImport} style={{ marginTop: 8 }}>Import</button>
        {r && st ? (
          <Sec eyebrow="Parsed recipe" thin>
            <div style={{ paddingTop: 14 }}><RecipeCard r={r} /></div>
            <div className="meta" style={{ marginTop: 10 }}><b>{st.have} of {st.of}</b> ingredients in your fridge · <b>{st.saleHits}</b> on sale this week</div>
            <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
              <button className="btn primary" onClick={() => act.saveImport(r.id)}>Save to imported recipes</button>
              <button className="btn secondary" onClick={() => act.detail(r.id)}>Open recipe</button>
            </div>
          </Sec>
        ) : (
          <p className="dek" style={{ marginTop: 22 }}>Plateful reads the caption and video, pulls out the ingredients and matches them to your fridge and this week’s flyers.</p>
        )}
      </Pad>
      <Spacer />
    </>
  );
}
