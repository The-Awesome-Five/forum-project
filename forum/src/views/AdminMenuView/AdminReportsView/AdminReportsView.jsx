import { useState, useEffect } from "react";
import { getAllPosts } from "../../../services/post.service";
import { Link } from "react-router-dom";
import { removeReport } from "../../../services/report.service";

export const AdminReportsView = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        getAllPosts()
            .then(data => {
                const postsArray = Object.values(data);
             
                const reportedPosts = postsArray.filter(post => post.reportedBy);

                setReports(reportedPosts);
            })
            .catch(error => console.error("Error fetching posts:", error));
    }, []);

    const handleRemoveReport = async (subcategoryId, postId) => {
        await removeReport(subcategoryId, postId);         
        setReports(reports.filter(report => report.id !== postId));
    };

    return (
        <div>
            <h1>Reported Posts</h1>
            <ul>
                {reports.map((report, index) => (
                    <li key={index}>
                        <h3>
                            <Link to={`/category/${report.category}/${report.subcategoryId}/${report.id}`}>
                                {report.Title}
                            </Link>
                        </h3>
                        <p>{report.Content}</p>
                        <p><strong>Created On:</strong> {report.CreatedOn}</p>
                        <button onClick={() => handleRemoveReport(report.subcategoryId, report.id)}>
                            Remove Report
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
