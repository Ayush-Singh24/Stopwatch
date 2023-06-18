export default function LapTable({ laps }) {
  return (
    <div className="lap__container">
      <table className="lap">
        <tbody>
          {laps.map((lap, ind) => {
            return (
              <tr>
                <td className="lap__display">Lap {ind + 1} </td>
                <td className="lap__display">{lap}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
