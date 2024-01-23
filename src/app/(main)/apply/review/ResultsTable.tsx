import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import React from 'react';

type Props = {
  application: Application;
};

export default function ResultsTable({ application }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableColumn>Course</TableColumn>
        <TableColumn>Grade</TableColumn>
      </TableHeader>
      <TableBody>
        {application?.results.map((result) => (
          <TableRow key={result.course}>
            <TableCell>{result.course}</TableCell>
            <TableCell>{result.grade.grade}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
