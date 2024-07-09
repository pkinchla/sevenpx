import drawings from '../components/DrawingsSignal.tsx';
import { Drawing } from '../utils/interfaces/drawing.ts';
import ListItem from './ListItem.tsx';

export default function List() {
  return (
    <>
      <ul className="drawings">
        {drawings.value.map((drawing: Drawing) => {
          return (
            <ListItem
              key={drawing.title}
              index={drawing.title}
              drawing={drawing}
            />
          );
        })}
      </ul>
    </>
  );
}
