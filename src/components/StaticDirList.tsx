import React from 'react';
import {usePluginData} from '@docusaurus/useGlobalData';

interface StaticDirListProps {
  directoryPath: string;
}

export default function StaticDirList({directoryPath}: StaticDirListProps): JSX.Element | null {
  const data = usePluginData('dynamic-file-list-plugin');
  
  if (!data || !data.staticDirectories || !data.staticDirectories[directoryPath]) {
    return null;
  }

  const files = data.staticDirectories[directoryPath] as string[];

  if (files.length === 0) {
    return null;
  }

  return (
    <ul>
      {files.map((file) => (
        <li key={file}>
          <a href={`/${directoryPath}/${file}`} target="_blank">
            {file}
          </a>
        </li>
      ))}
    </ul>
  );
}
