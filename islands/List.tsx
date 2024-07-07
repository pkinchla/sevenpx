import drawings from '../components/DrawingsSignal.tsx';
import ListItem from './ListItem.tsx';

export default function List() {
  return (
    <>
      <ul className="drawings">
        {drawings.value.map((drawing) => {
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
