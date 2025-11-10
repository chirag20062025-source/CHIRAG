
import React, { useState } from 'react';
import { PenIcon } from './icons/PenIcon';

const Notes: React.FC = () => {
  const [note, setNote] = useState<string>('');

  return (
    <div className="bg-base-200 rounded-xl p-6 shadow-lg h-full">
        <div className="flex items-center mb-4">
            <PenIcon className="w-5 h-5 text-brand-secondary mr-3" />
            <h2 className="text-xl font-bold">Scratch Pad</h2>
        </div>
        <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Jot down your thoughts..."
            className="w-full h-48 bg-base-100 border-2 border-base-300 rounded-lg p-4 focus:outline-none focus:border-brand-primary transition-colors duration-200 resize-none"
        />
    </div>
  );
};

export default Notes;
