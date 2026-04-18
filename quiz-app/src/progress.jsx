import Questions from "./questions.jsx";

function Progress({ current, total }) {
    const percent = total ? (current / total) * 100 : 0;

    return (
        <div>
            <div className="progress" style={{ height: "10px", borderRadius: "10px" }}>
             {   <div
                    className="progress-bar"
                    style={{ width: `${percent}%` }}
                ></div>}
            </div>
        </div>
    );
}
export default Progress;