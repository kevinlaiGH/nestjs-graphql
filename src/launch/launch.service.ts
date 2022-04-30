import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { LaunchModel, SpacexLaunch } from './launch.model';

@Injectable()
export class LaunchService {
  private apiUrl = 'https://api.spacexdata.com/v3';

  constructor(private http: HttpService) {}

	private toLaunch(launch: SpacexLaunch): LaunchModel{
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    };
	}

  getAllLaunches(): any {
    return this.http.get(`${this.apiUrl}/launches`);
  }

  getLaunchById(id: number): any {
    return this.http.get(`${this.apiUrl}/launches/${id}`);
  }
}
