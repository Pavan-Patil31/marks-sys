
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

const StudentTable = ({ students = [], handleEdit, handleDelete }) => {
  // Early return if students is not an array
  if (!Array.isArray(students)) {
    console.error('Students prop is not an array:', students);
    return <div className="error">Error loading student data</div>;
  }

  // Calculate results for each student
  const calculateResults = (student) => {
    const marks = [student.mark1, student.mark2, student.mark3, student.mark4, student.mark5];
    const totalMarks = marks.reduce((sum, mark) => sum + parseInt(mark || 0), 0);
    const percentage = (totalMarks / 500) * 100;
    
    let division;
    if (percentage >= 80) division = 'First';
    else if (percentage >= 60) division = 'Second';
    else if (percentage >= 40) division = 'Third';
    else division = 'Fail';
    
    return { 
      percentage: percentage.toFixed(2), 
      division,
      divisionClass: `division-${division.toLowerCase()}`
    };
  };

  // Prepare data with calculated fields
  const data = React.useMemo(() => {
    return students.map(student => {
      const results = calculateResults(student);
      return {
        ...student,
        percentage: `${results.percentage}%`,
        division: results.division,
        divisionClass: results.divisionClass
      };
    });
  }, [students]);

  // Define columns
  const columns = React.useMemo(() => [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Age',
      accessorKey: 'age',
    },
    {
      header: 'Mark 1',
      accessorKey: 'mark1',
    },
    {
      header: 'Mark 2',
      accessorKey: 'mark2',
    },
    {
      header: 'Mark 3',
      accessorKey: 'mark3',
    },
    {
      header: 'Mark 4',
      accessorKey: 'mark4',
    },
    {
      header: 'Mark 5',
      accessorKey: 'mark5',
    },
    {
      header: 'Percentage',
      accessorKey: 'percentage',
    },
    {
      header: 'Division',
      accessorKey: 'division',
      cell: ({ row }) => (
        <span className={row.original.divisionClass}>
          {row.original.division}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="action-buttons">
          <button 
            className="action-btn edit-btn"
            onClick={() => handleEdit(row.index)}
            aria-label="Edit student"
          >
            <FaEdit />
          </button>
          <button 
            className="action-btn delete-btn"
            onClick={() => handleDelete(row.index)}
            aria-label="Delete student"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ], [handleEdit, handleDelete]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
      <h2 className="form-title">Student Records</h2>
      {students.length === 0 ? (
        <p className="no-records">No student records found. Add some using the form.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-footer">
            Showing {students.length} student{students.length !== 1 ? 's' : ''}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentTable;