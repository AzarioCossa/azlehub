import { useState, useEffect, useCallback } from 'react';
import { ChmodService, ChmodState, PermissionSet } from '../services/ChmodService';

const defaultState: ChmodState = {
  owner: { read: true, write: true, execute: false },
  group: { read: true, write: false, execute: false },
  public: { read: true, write: false, execute: false }
};

export const useChmodCalculator = () => {
  const [state, setState] = useState<ChmodState>(defaultState);
  const [octalInput, setOctalInput] = useState('644');

  const togglePermission = (entity: keyof ChmodState, perm: keyof PermissionSet) => {
    setState(prev => {
      const newState = {
        ...prev,
        [entity]: { ...prev[entity], [perm]: !prev[entity][perm] }
      };
      setOctalInput(ChmodService.toOctal(newState));
      return newState;
    });
  };

  const handleOctalChange = (value: string) => {
    const sanitized = value.replace(/[^0-7]/g, '').slice(0, 3);
    setOctalInput(sanitized);

    if (sanitized.length === 3) {
      const parsedState = ChmodService.fromOctal(sanitized);
      if (parsedState) setState(parsedState);
    }
  };

  const copyCommand = useCallback((command: string) => {
    navigator.clipboard.writeText(command);
  }, []);

  return {
    state,
    octalInput,
    symbolic: ChmodService.toSymbolic(state),
    togglePermission,
    handleOctalChange,
    copyCommand
  };
};