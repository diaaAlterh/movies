import { Pagination } from "@mui/material";

const PaginationComponent =(props)=>{
    return (
        (props.count>1)&&<div
          style={{
            width: "100%",
            paddingTop: "20px",
            paddingBottom: "20px",
            textAlign: "center",
            justifyContent:"center",
            alignItems: "center",
            position:"absolute",
            display: "flex"
          }}
        >
          <Pagination
            onChange={props.onChange}
            page={props.page}
            count={+(props.count)}
            color="secondary"
          />
        </div>
    );
}

export default PaginationComponent;