import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function SingleTask({ task, onDelete }) {
  return (
    <Card
      sx={{
        marginBottom: "10px",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        position: "relative",
      }}
    >
      <CardContent>
        <Typography variant="h6">{task.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {task.description}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Status: {task.status}
        </Typography>
        {/* Delete Icon */}
        <IconButton
          aria-label="delete"
          onClick={() => onDelete(task.id)}
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default SingleTask;
