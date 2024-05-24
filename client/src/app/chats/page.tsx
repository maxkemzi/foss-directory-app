import {ProjectChatSidebar} from "#src/widgets/ProjectChatSidebar";

const Chats = () => {
	return (
		<div className="grid grid-cols-[200px,_1fr] grid-rows-[70vh] gap-6">
			<ProjectChatSidebar />
			<div>Select a chat from the sidebar.</div>
		</div>
	);
};

export default Chats;
