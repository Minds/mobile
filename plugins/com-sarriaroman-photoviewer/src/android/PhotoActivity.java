package com.sarriaroman.PhotoViewer;

import uk.co.senab.photoview.PhotoViewAttacher;
import uk.co.senab.photoview.PhotoView;
import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.Environment;
import android.util.Base64;
import android.view.View;
import android.widget.ImageButton;

import android.content.Intent;
import android.net.Uri;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.load.resource.drawable.GlideDrawable;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.Target;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class PhotoActivity extends Activity {
	private PhotoViewAttacher mAttacher;

	private PhotoView photo;
	private String imageUrl;

	private ImageButton closeBtn;
	private ImageButton shareBtn;

	private TextView titleTxt;

	private JSONObject options;
	private int shareBtnVisibility;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		setContentView(getApplication().getResources().getIdentifier("activity_photo", "layout", getApplication().getPackageName()));

		// Load the Views
		findViews();

		try {
			options = new JSONObject(this.getIntent().getStringExtra("options"));
			shareBtnVisibility = options.getBoolean("share") ? View.VISIBLE : View.INVISIBLE;
		} catch(JSONException exception) {
			shareBtnVisibility = View.VISIBLE;
		}
		shareBtn.setVisibility(shareBtnVisibility);

		// Change the Activity Title
		String actTitle = this.getIntent().getStringExtra("title");
		if( !actTitle.equals("") ) {
			titleTxt.setText(actTitle);
		}

		imageUrl = this.getIntent().getStringExtra("url");

		// Set Button Listeners
		closeBtn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				finish();
			}
		});

		shareBtn.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				Uri bmpUri = getLocalBitmapUri(photo);

				if (bmpUri != null) {
				    Intent sharingIntent = new Intent(Intent.ACTION_SEND);

				    sharingIntent.setType("image/*");
				    sharingIntent.putExtra(Intent.EXTRA_STREAM, bmpUri);

				    startActivity(Intent.createChooser(sharingIntent, "Share"));
				}
			}
		});

		loadImage();
	}

	/**
	 * Find and Connect Views
	 *
	 */
	private void findViews() {
		// Buttons first
		closeBtn = (ImageButton) findViewById( getApplication().getResources().getIdentifier("closeBtn", "id", getApplication().getPackageName()) );
		shareBtn = (ImageButton) findViewById( getApplication().getResources().getIdentifier("shareBtn", "id", getApplication().getPackageName()) );

		// Photo Container
		photo = (PhotoView) findViewById( getApplication().getResources().getIdentifier("photoView", "id", getApplication().getPackageName()) );
		mAttacher = new PhotoViewAttacher(photo);

		// Title TextView
		titleTxt = (TextView) findViewById( getApplication().getResources().getIdentifier("titleTxt", "id", getApplication().getPackageName()) );
	}

	/**
	 * Get the current Activity
	 *
	 * @return
	 */
	private Activity getActivity() {
		return this;
	}

	/**
	 * Hide Loading when showing the photo. Update the PhotoView Attacher
	 */
	private void hideLoadingAndUpdate() {
		photo.setVisibility(View.VISIBLE);

		shareBtn.setVisibility(shareBtnVisibility);

		mAttacher.update();
	}

	/**
	 * Load the image using Glide
	 *
	 */
	private void loadImage() {
		if (imageUrl.startsWith("http") || imageUrl.startsWith("file")) {
			Glide.with(this)
				.load(imageUrl)
				.skipMemoryCache(true)
				.diskCacheStrategy(DiskCacheStrategy.SOURCE)
				.fitCenter()
				.listener(new RequestListener<String, GlideDrawable>() {
					@Override
					public boolean onResourceReady(GlideDrawable resource, String model, Target<GlideDrawable> target, boolean isFromMemoryCache, boolean isFirstResource) {
						hideLoadingAndUpdate();
						return false;
					}

					@Override
					public boolean onException(Exception e, String model, Target<GlideDrawable> target, boolean isFirstResource) {
						Toast.makeText(getActivity(), "Error loading image.", Toast.LENGTH_LONG).show();

						finish();
						return false;
					}
				})
				.into(photo);
	} else if ( imageUrl.startsWith("data:image")){
            String base64String = imageUrl.substring(imageUrl.indexOf(",")+1);
            byte[] decodedString = Base64.decode(base64String, Base64.DEFAULT);
            Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
            photo.setImageBitmap(decodedByte);

            hideLoadingAndUpdate();
        } else {
            photo.setImageURI(Uri.parse(imageUrl));

            hideLoadingAndUpdate();
        }
	}

	/**
	 * Create Local Image due to Restrictions
	 *
	 * @param imageView
	 *
	 * @return
	 */
	public Uri getLocalBitmapUri(PhotoView imageView) {
		Drawable drawable = imageView.getDrawable();
		Bitmap bmp = null;

		if (drawable instanceof BitmapDrawable){
			bmp = ((BitmapDrawable) imageView.getDrawable()).getBitmap();
		} else {
			return null;
		}

		// Store image to default external storage directory
		Uri bmpUri = null;
		try {
			File file =  new File(
					Environment.getExternalStoragePublicDirectory(
						Environment.DIRECTORY_DOWNLOADS
					), "share_image_" + System.currentTimeMillis() + ".png");

			file.getParentFile().mkdirs();

			FileOutputStream out = new FileOutputStream(file);
			bmp.compress(Bitmap.CompressFormat.PNG, 90, out);
			out.close();

			bmpUri = Uri.fromFile(file);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return bmpUri;
	}

}
