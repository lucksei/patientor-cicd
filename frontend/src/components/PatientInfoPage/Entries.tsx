import { List, Typography } from '@mui/material';

import Entry from './Entry';
import NewEntryForm from './NewEntryForm';
import type { Entry as EntryType, EntryWithoutId } from '../../types';

interface EntriesProps {
  entries: EntryType[];
  handleSubmit: (_entry: EntryWithoutId) => Promise<void>;
  diagnosisCodesOptions?: string[];
}

const Entries = (props: EntriesProps) => {
  const { entries } = props;

  const handleSubmit = async (entry: EntryWithoutId) => {
    await props.handleSubmit(entry);
  };

  return (
    <>
      <NewEntryForm
        handleSubmit={handleSubmit}
        diagnosisCodesOptions={props.diagnosisCodesOptions}
      />
      {entries.length === 0 ? (
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          Patient has no entries
        </Typography>
      ) : (
        <List>
          {entries.map((entry) => (
            <Entry key={entry.id} entry={entry} />
          ))}
        </List>
      )}
    </>
  );
};

export default Entries;
