import React from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';

const headers = [
  { key: 'client', header: 'MCP Client' },
  { key: 'support', header: 'System Prompt Support' },
  { key: 'notes', header: 'Notes' },
];

const rows = [
  {
    id: '1',
    client: 'Claude Code',
    support: 'Yes',
    notes: 'Workspace and project-level rules supported',
  },
  {
    id: '2',
    client: 'Claude Desktop',
    support: 'Yes',
    notes: 'Per-chat and per-agent system prompts supported',
  },
  {
    id: '3',
    client: 'Cursor',
    support: 'Yes',
    notes: 'Persistent workspace instructions and rules',
  },
  {
    id: '4',
    client: 'GitHub Coding Agent',
    support: 'No',
    notes: 'Uses internal non-editable system prompts',
  },
  {
    id: '5',
    client: 'VS Code',
    support: 'No',
    notes: 'No system prompt configuration available',
  },
];

export const ClientSupportTable: React.FC = () => {
  return (
    <DataTable rows={rows} headers={headers}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })} key={header.key}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })} key={row.id}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.id.includes('support') ? (
                      <strong>{cell.value}</strong>
                    ) : (
                      cell.value
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  );
};

// Made with Bob
