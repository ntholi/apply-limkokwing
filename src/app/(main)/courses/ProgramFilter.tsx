import { Faculties } from '@/app/(admin)/admin/programs/modal/faculty';
import { Button } from '@nextui-org/react';
import { useQueryState } from 'nuqs';

export default function CourseFilter() {
  const [selected, setSelected] = useQueryState('faculty');
  return (
    <nav className='flex justify-start md:justify-center W-100vw overflow-auto pb-2'>
      <ul className='flex gap-3 mt-5'>
        {Faculties.map((faculty) => (
          <li key={faculty.code}>
            <Button
              onClick={() => {
                if (selected === faculty.code) {
                  setSelected(null);
                } else {
                  setSelected(faculty.code);
                }
              }}
              variant={faculty.code === selected ? 'solid' : 'bordered'}
              color={faculty.code === selected ? 'primary' : 'default'}
              size='sm'
              radius='full'
            >
              {faculty.tag}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
