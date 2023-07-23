import * as React from "react";
import { useTable } from "react-table";

function Table() {
  const [data, setData] = React.useState([]); // Inicializar 'data' como un array vacío

  React.useEffect(() => {
    fetch("http://127.0.0.1:8000/api/listarContratos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ /* Datos que quieras enviar en el cuerpo de la solicitud POST */ }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Data recibida desde la API:", responseData);
        setData(responseData.data); // Acceder a los datos dentro de la propiedad "data" del JSON
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Contrato",
        accessor: "Contrato",
      },
      {
        Header: "Exportar",
        accessor: "exportar",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.original.exportar} // Aquí asumimos que los datos de "exportar" en cada fila son booleanos (true/false)
            onChange={() => {
              // Aquí puedes manejar el evento onChange del checkbox según tus necesidades
              // Por ejemplo, podrías actualizar el estado para reflejar el valor seleccionado o realizar alguna acción en función del valor del checkbox.
            }}
          />
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="App">
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
