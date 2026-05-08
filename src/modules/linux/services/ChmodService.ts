export interface PermissionSet {
  read: boolean;
  write: boolean;
  execute: boolean;
}

export interface ChmodState {
  owner: PermissionSet;
  group: PermissionSet;
  public: PermissionSet;
}

export const ChmodService = {
  toOctal: (state: ChmodState): string => {
    const calcBlock = (p: PermissionSet) => (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
    return `${calcBlock(state.owner)}${calcBlock(state.group)}${calcBlock(state.public)}`;
  },

  toSymbolic: (state: ChmodState): string => {
    const getSym = (p: PermissionSet) => `${p.read ? 'r' : '-'}${p.write ? 'w' : '-'}${p.execute ? 'x' : '-'}`;
    return `${getSym(state.owner)}${getSym(state.group)}${getSym(state.public)}`;
  },

  fromOctal: (octal: string): ChmodState | null => {
    if (!/^[0-7]{3}$/.test(octal)) return null;
    
    const parseBlock = (char: string): PermissionSet => {
      const num = parseInt(char, 10);
      return {
        read: (num & 4) === 4,
        write: (num & 2) === 2,
        execute: (num & 1) === 1
      };
    };

    return {
      owner: parseBlock(octal[0]),
      group: parseBlock(octal[1]),
      public: parseBlock(octal[2])
    };
  }
};