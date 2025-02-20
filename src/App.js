
import { healthCheckApi } from "./api/apis/healthCheckApi";
import { Link, Links, Route, Routes, useNavigate } from "react-router-dom";
import IndexPage from "./pages/IndexPage/IndexPage";
import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import AuthRoute from "./routes/AuthRoute/AuthRoute";
import { userApi } from "./api/apis/userApi";
import { jwtDecode } from "jwt-decode";
import UserRoute from "./routes/UserRoute/UserRoute";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { api } from "./api/config/axiosConfig";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {

	// const navigate = useNavigate();

	// const healthCheckQuery = useQuery({ // react-query 5 버전부터는 querykey, queryFn 추가
	// 	queryKey: ["healthCheckQuery"], 
	// 	queryFn: healthCheckApi, 
	// 	cacheTime: 1000 * 60 * 10, //캐시 유지 시간(언마운트 이후),
	// 	staleTime: 1000 * 60 * 10, //10분마다 최신의 캐시 상태 유지(refetch)
	// }
	// );

	// if(!healthCheckQuery.isLoading) {
	// 	console.log(healthCheckQuery.data.data.status);
	// }

	const userQuery = useQuery({
		queryKey: ["userQuery"],
		queryFn: async () => {
			const accessToken = localStorage.getItem("AccessToken");
			if (!accessToken) {
				return null;
			}
			const decodedJwt = jwtDecode(accessToken);
			return await userApi(decodedJwt.jti);
		},
	});

	

  	return (
    	<Container maxWidth="lg">
			
			{
				(!userQuery.isLoading && !userQuery.isRefetching) && // 5버전에서는 isLoading해도 false값이다.
				<>
					<MainHeader />
					<Routes>
						<Route path="/" element={<IndexPage />} />
						<Route path="/user/*" element={<UserRoute />} />
						<Route path="/auth/*" element={<AuthRoute />} />
					</Routes>
				</>
				
			}
			
    	</Container>
  	);
}

export default App;