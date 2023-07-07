/// <reference types="@types/google.maps" />
import { Company } from "./Company";
import { CustomMap } from "./CustomMap";
import { User } from "./User";

const cumstomMap = new CustomMap("map");
const user = new User();
const company = new Company();

cumstomMap.addMarker(user);
cumstomMap.addMarker(company);
