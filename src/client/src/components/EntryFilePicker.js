import React, { useState } from "react";
import useLocalStorage from "react-use/lib/useLocalStorage";

import { useFileSearchQuery } from "../hooks/api/useFileSearchQuery";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

const EMPTY_ARRAY = [];

export function EntryFilePicker() {
	const [entryFile, setEntryFile] = useLocalStorage("pick-entry", "");
	const [searchKeyword, setSearchKeyword] = useState(entryFile || "");
	const { data, status } = useFileSearchQuery(searchKeyword);
	const [open, setOpen] = React.useState(false);
	const loading = status === "loading";

	return (
		<>
			<Typography variant="h4" color="primary" gutterBottom>
				Select Entry File
			</Typography>
			<Autocomplete
				id="asynchronous-demo"
				style={{ width: "100%" }}
				value={entryFile}
				onChange={(event, newValue) => {
					setEntryFile(newValue);
				}}
				open={open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				inputValue={searchKeyword}
				onInputChange={(event, newInputValue) => {
					setSearchKeyword(newInputValue);
				}}
				getOptionLabel={(option) => option}
				options={data || EMPTY_ARRAY}
				loading={loading}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Search file"
						variant="outlined"
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{loading ? (
										<CircularProgress color="inherit" size={20} />
									) : null}
									{params.InputProps.endAdornment}
								</React.Fragment>
							),
						}}
					/>
				)}
			/>
		</>
	);
}